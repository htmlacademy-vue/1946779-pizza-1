<template>

  <div class="sheet address-form">
    <div class="address-form__header">
      <b>{{ address.name }}</b>
      <div class="address-form__edit">

        <button
          type="button"
          class="icon"
          @click="$emit('editAddress', address)"
        >
          <span class="visually-hidden">Изменить адрес</span>
        </button>

      </div>
    </div>
    <p>Улица {{ address.street }}, дом {{ address.building }}, квартира {{ address.flat }}</p>
    <small>{{ address.comment }}</small>
  </div>

</template>
<script>
export default {
  name: "ProfileAddressView",
  props: {
    address: {
      type: Object,
      required: true
    }
  },
}
</script>
