<template>
  <div class="test-login">
    <Form ref="formCustom" :model="formCustom" :label-width="80">
      <FormItem label="手机号码" prop="passwd">
        <Input type="text" v-model="formCustom.phone" />
      </FormItem>
      <FormItem label="密码" prop="passwdCheck">
        <Input type="password" v-model="formCustom.password" />
      </FormItem>
      <FormItem label="机构号" prop="age">
        <Input type="text" v-model="formCustom.code" number />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">Submit</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import dataStore from '../data/index'
export default {
  name: 'login',
  data () {
    return {
      formCustom: {
        phone: '',
        password: '',
        code: ''
      }
    }
  },
  methods: {
    handleSubmit () {
      console.log(222222222)
      console.log(dataStore.getCookie('user'))
      console.log(222222222)
    }
  }
}
</script>

<style scoped>
 .test-login {
   margin-top: 300px;
   margin-left: 400px;
   width: 500px;
   height: 1200px;
 }
</style>
