<script setup>
import AuthAPI from '../../api/AuthAPI'
import { useRouter } from 'vue-router'
import { inject } from 'vue'

const toast = inject('toast')
const router = useRouter()

const handleSubmit = async (formData) => {
    try {
      const { data: {token} } = await AuthAPI.login(formData)
      //toast.open({
      //  message: data.msg,
      //  type: 'success'
      //})
      localStorage.setItem('AUTH_TOKEN', token)
      router.push({name: 'my-appointments'})
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: 'error'
      })
    }
  }
</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">Iniciar sesión</h1>
  <p class="text-2xl text-white text-center my-5">Si tienes una cuenta, inicia sesión</p>

  <FormKit
  id="loginForm"
  type="form"
  :autocomplete="true"
  :actions="false"
  incomplete-message="No se pudo enviar el formulario"
  @submit="handleSubmit"
  >
  

  <FormKit 
    type="email"
    label="Email"
    name="email"
    placeholder="Email de usuario"
    validation="required|email"
    :validation-messages="{
      required: 'El email es obligatorio',
      email: 'Email no válido'
    }"
  />

  <FormKit 
    type="password"
    label="Password"
    name="password"
    placeholder="Password de usuario"
    validation="required|length:8"
    :validation-messages="{
      required: 'El password es obligatorio'
    }"
  />

  <FormKit type="submit">Iniciar sesión</FormKit>

  </FormKit>

</template>