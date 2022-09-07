<template>
    <div class="mt-4 text-center space-x-6">
      <button :class="isOpen ? 'bg-pink-500' : ''" @click="handleBuy()"
        class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600">
        {{isOpen? 'Wait': 'Get'}}
      </button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import axios from 'axios';
  import router from '../router';
  
  import { useWalletStore } from '../stores/wallet'
  
  export default defineComponent({
    components: {},
    setup() {
      const walletStore = useWalletStore()
      const isOpen = ref<boolean>(false)
      const buyData = ref<any>([])
      const sellData = ref<any>([])
  
      const handleBuy = async () => {
        isOpen.value = true;
        const res = await axios.get('https://rest.coinapi.io/v1/assets', {
          headers: {
            'X-CoinAPI-Key': 'CBE9E61F-D955-4DFA-95BD-97AD3A1DE991',
          },
        });
        // sort by volume_1day_usd
        res.data.sort((a: any, b: any) => b.volume_1day_usd - a.volume_1day_usd);
        buyData.value = res.data.slice(0, 10);
        sellData.value = res.data.slice(-10);
        walletStore.saveVolumn1dayUsd({ buy: buyData.value, sell: sellData.value });
        isOpen.value = false;
        router.push('/about');
      }
  
  
      return {
        walletStore,
        isOpen,
        handleBuy,
      }
    },
  })
  </script>
  