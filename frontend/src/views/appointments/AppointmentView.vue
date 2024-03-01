<script setup>
import {ref} from 'vue'
import { formatCurrency } from '@/helpers';
import SelectedService from '../../components/SelectedService.vue';
import { useAppointmentsStore } from '../../stores/appointments';
import VueTailwindDatePicker from 'vue-tailwind-datepicker'

const appoinments = useAppointmentsStore()

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM'
})

const disableDate = (date) => {
  const today = new Date()
  return date < today || date.getMonth() > today.getMonth() + 1 || [2].includes(date.getDay())
}
</script>


<template>

  <h2 class="text-4xl font-extrabold text-white">Detalles Cita y Resumen</h2>
  <p class="text-white text-lg">A continuación verifica la información y confirma tu cita</p>

  <h3 class="text-3xl font-extrabold text-white">Servicios</h3>
  <p v-if="appoinments.noServiceSelected" class="text-white text-2xl text-center">No hay servicios seleccionados</p>

  <div v-else class="grid gap-5">
    <SelectedService
    v-for="service in appoinments.services"
    :key="service._id"
    :service="service"
    />
    <p class="text-right text-white text-2xl">Total a pagar: <span class="font-black">{{ formatCurrency(appoinments.totalAmount) }}</span></p>
  </div>

  <div class="space-y-8" v-if="!appoinments.noServiceSelected">
    <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>

    <div class="lg:flex gap-5 items-start">

      
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatePicker
        :disable-date="disableDate"
        i18n="es-do"
        as-single
        no-input
        :formatter="formatter"
        v-model="appoinments.date"
        />
      </div>

      <div class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
          <button
          v-for="hour in appoinments.hours"
          class="block text-blue-500 rounded-lg text-xl font-black p-3 "
          @click="appoinments.time = hour"
          :class="appoinments.time === hour ? 'bg-blue-500 text-white' : 'bg-white'"
          >
          {{ hour }}
          </button>
      </div>
    </div>

    <div v-if="appoinments.isValidReservation" class="flex justify-end">
        <button 
        type="button"
        class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
        @click="appoinments.createAppointment"
        >
          Confirmar Cita
        </button>
    </div>

  </div>


</template>