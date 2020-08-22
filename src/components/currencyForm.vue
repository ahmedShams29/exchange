<template>
    <div id="currency-form">
        <div class="row">
            <div class="col-md-2">
                <h3>From</h3>
            </div>
            <div class="col-md-3">
                <select id="fromCur" class="form-control" v-model="rateFrom" @change="changeCurrencies($event,'from')" ref="fromCur">
                    <option v-for="(item, index) in items" v-bind:key="item" v-bind:value="index">{{ index }}</option>
                </select>
                <span>Rate: {{ rateFromText }}</span>
            </div>
            <div class="col-md-6">
                <input type="number" id="fromAmount" placeholder="From" class="form-control" ref="amount" v-model="inputed" v-on:change="calculateExchangeRate">
            </div>
        </div>

        <div class="row">
            <div class="col-md-2">
                <h3>To</h3>
            </div>
            <div class="col-md-3">
                <select id="toCur" class="form-control" v-model="rateTo" @change="changeCurrencies($event,'to')" ref="toCur">
                    <option v-for="(item, index) in items1" v-bind:key="item" v-bind:value="index">{{ index }}</option>
                </select>
                <span>Rate: {{ rateToText }}</span>
            </div>
            <div class="col-md-6">
                <input type="number" id="toAmount" placeholder="To" class="form-control" ref="result" v-model="result" readonly>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "currency-form",
        data() {
            return {
                inputed: "",
                result: null,
                items: null,
                items1: null,
                rateFrom: 'EUR',
                rateTo: 'USD',
                rateFromText: '',
                rateToText: '',
            };
        },
        mounted() {
            this.fetchData()
        },
        methods: {
            fetchData: function() {
                let self = this;
                // Simple GET request using fetch
                fetch("https://api.exchangerate.host/latest")
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        self.items = self.items1 = data.rates
                    }).catch(error => {
                        console.log(error);
                });
            },
            getCurrencyRate (currency) {
                return this.items[currency];
            },
            calculateExchangeRate: function() {
                console.log(this.rateTo+' + '+this.rateFrom);
                let fromRate = this.getCurrencyRate(this.rateFrom);
                let toRate = this.getCurrencyRate(this.rateTo);
                let amount = this.inputed;
                let resultCalc = 0;

                if(fromRate === 1)
                    resultCalc = amount * toRate;
                else
                    resultCalc = (toRate / fromRate) *  amount;

                console.table({fromRate,amount,toRate,resultCalc});
                // Rounding to ten thousandths
                this.result = this.roundCurrency(resultCalc);

            },

            roundCurrency(result) {
               return result ? Math.floor(result * 100) / 100 : null;
            },

            changeCurrencies(event, curtype) {
                if(curtype === 'from')
                    this.rateFrom = event.target.value;
                else if(curtype === 'to')
                    this.rateTo = event.target.value;

                this.calculateExchangeRate()
            }
        }
    }
</script>

<style scoped>

</style>0