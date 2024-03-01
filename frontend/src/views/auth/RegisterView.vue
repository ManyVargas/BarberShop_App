<script setup>
import AuthAPI from '../../api/AuthAPI'
import { inject } from 'vue'
import { reset } from '@formkit/vue'

const toast = inject('toast')



const handleSubmit = async ({password_confirm, ...formData}) => {
    try {
      const { data } = await AuthAPI.register(formData)
      toast.open({
        message: data.msg,
        type: 'success'
      })
      reset('registerForm')
    } catch (error) {
      toast.open({
        message: error.response.data.msg,
        type: 'error'
      })
    }
  }
  
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">Crea una cuenta</h1>
  <p class="text-2xl text-white text-center my-5">Crea una cuenta en BarberShop</p>

  <FormKit
  id="registerForm"
  type="form"
  :autocomplete="true"
  :actions="false"
  incomplete-message="No se pudo enviar el formulario"
  @submit="handleSubmit"
  >
  
  <FormKit 
    type="text"
    label="Nombre"
    name="name"
    placeholder="Tu nombre"
    validation="required|length:3"
    :validation-messages="{
      required: 'El nombre es obligatorio',
      length: 'El nombre es muy corto'
    }"
  />

  <FormKit 
    type="email"
    label="Email"
    name="email"
    placeholder="Email de registro"
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
    placeholder="Password de usuario - Min 8 Caracteres"
    validation="required|length:8"
    :validation-messages="{
      required: 'El password es obligatorio',
      length: 'El password debe contener al menos 8 caracteres'
    }"
  />

  <FormKit 
    type="password"
    label="Repetir password"
    name="password_confirm"
    placeholder="Repite el password"
    validation="required|confirm"
    :validation-messages="{
      required: 'El password es obligatorio',
      confirm: 'Los passwords no coinciden'
    }"
  />

  <FormKit type="submit">Crear Cuenta</FormKit>

  </FormKit>

</template>