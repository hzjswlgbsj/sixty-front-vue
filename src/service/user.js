/**
 * Created by WebStorm.
 * User: liulin
 * Date: 2018/5/3
 * Time: 上午11:28
 */

import { Store, Cookie } from '../common'
import userApi from '../api/users'
import _ from 'lodash'

/**
 * 获取所用或者部分用户
 * @param refresh 强制从远端获取数据
 * @param mixinId 混合id，如果传id(int)，返回id对应的数据，如果传weibo_uid(string)，也返回对应数据,不传返回所有(限制1000条)
 * @param page
 * @param limit
 * @return {Array}
 */
export async function getUsers (refresh, mixinId, page, limit) {
  if (refresh || Store.store('users').length === 0) {
    let users = await userApi.all(mixinId, page, limit)
    if (!mixinId) {
      Store.store('users', users)
    } else {
      return users[0]
    }
  }
  return Store.store('users')
}

/**
 * 根据字段来筛选数据，当前支持id和weibo_uid
 * @param columns
 * @param columnsValue
 * @return {Object}
 */
export async function getUserByFilterColumns (columns, columnsValue) {
  const users = await getUsers()
  return _.find(users, item => item[columns] === columnsValue)
}

/**
 * 获取当前用户数据
 * @return {Object}
 */
export function getCurrentUser () {
  return Cookie.get('userInformation')
}

/**
 * 检查是否已经注册过了
 * @param weiboUid
 * @return {Boolean}
 */
export async function checkRegister (weiboUid) {
  try {
    let user = await getUsers(true, weiboUid)
    if (user && user.id) {
      return true
    }
    return false
  } catch (e) {
    console.log(e)
  }
}

/**
 * 用户注册
 * @param nickname
 * @param avatar
 * @param status
 * @param weiboUid
 * @return {Boolean}
 */
export async function register (nickname, avatar, status, weiboUid) {
  const checkRegister = await checkRegister(weiboUid)
  if (checkRegister) {
    console.log('已经注册过了哦')
    return false
  }
  let res = await userApi.register(nickname, avatar, status, weiboUid)
  return res
}

/**
 * 用户登录
 * @param weiboUid(string)
 * @return {Boolean}
 */
export async function login (weiboUid) {
  console.log('已经进入登录流程weiboUid', weiboUid)
  try {
    let user = await getUsers(true, weiboUid)
    console.log('获取用户信息', user)
    if (user && user.id) {
      console.log('向cookie中写入信息', user)
      Cookie.set('userInformation', JSON.stringify(user))
    }
    let userCookieInformation = Cookie.get('userInformation')
    if (userCookieInformation) {
      console.log('向cookie中写入信息成功', userCookieInformation)
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * 注销账户
 */
export function logout () {
  Cookie.set('userInformation', '')
}

/**
 * 检查是否登录
 * @return {boolean}
 */
export function checkLogin () {
  console.log('进入检查登录状态')
  let userInformation = Cookie.get('userInformation')
  if (userInformation && userInformation.id) {
    console.log('当前处于登录状态')
    return true
  }
  console.log('当前处于没有登录状态')
  return false
}
