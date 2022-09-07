import { defineStore } from 'pinia'

interface WalletData {
  address: string
  acc_short: string
}
interface VolumnData {
  buy: Array<object>,
  sell: Array<object>,
}

export const useWalletStore = defineStore('wallet', {
  state: () => {
    return {
      address: '',
      provider: null,
      acc_short: '',
      volumn_1day_usd_buy: [{}],
      volumn_1day_usd_sell: [{}],
    }
  },

  actions: {
    //@ts-ignore
    saveWalletData(payload: WalletData) {
      this.address = payload.address
      this.acc_short = `${payload.address.slice(
        0,
        2
      )}...${payload.address.slice(-4)}`
    },
    saveVolumn1dayUsd(payload: VolumnData) {
      this.volumn_1day_usd_buy = payload.buy
      this.volumn_1day_usd_sell = payload.sell
    }
  },
})
