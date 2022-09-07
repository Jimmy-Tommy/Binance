<template>
  <div class="pt-12 text-center">
  </div>
  <div class="mt-4 flex justify-evenly">
    <div class="row-span-5">
      <h3 class="text-2xl mb-8">Top 10 Market Cap in 24 hours</h3>
      <div v-for="item in buyData" :key="item.asset_id" class="flex justify-between">
        <p>{{ item.name }}</p>
        <p> : </p>
        <p>{{ item.volume_1day_usd }} </p><br />
      </div>
    </div>
    <div class="row-span-2"></div>
    <div class="row-span-5">
      <h3 class="text-2xl mb-8">Lowest 10 Volume in 24 hours</h3>
      <div v-for="item in sellData" :key="item.asset_id" class="flex justify-between">
        <p>{{ item.name }}</p>
        <p> : </p>
        <p>{{ item.volume_1day_usd }} </p><br />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useWalletStore } from '../stores/wallet'

export default defineComponent({
  setup() {
    const walletStore = useWalletStore()
    //define buyData
    const buyData = ref<any[]>([])
    const sellData = ref<any[]>([])
    // console.log("walletStore", walletStore.volumn_1day_usd_buy);
    walletStore.volumn_1day_usd_buy.forEach((item: any) => {
      buyData.value.push(item)
    })
    walletStore.volumn_1day_usd_sell.forEach((item: any) => {
      sellData.value.push(item)
    })

    return {
      buyData,
      sellData,
      walletStore,
    }
  },
})
</script>
