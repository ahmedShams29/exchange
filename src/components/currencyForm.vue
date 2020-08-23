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
                <span>{{ rateFromText }}</span>
            </div>
            <div class="col-md-6">
                <input type="number" id="fromAmount" placeholder="From" class="form-control" ref="amount" v-model="amount" v-on:change="calculateExchangeRate">
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
            </div>
            <div class="col-md-6">
                <input type="number" id="toAmount" placeholder="To" class="form-control" ref="result" v-model="result" readonly>
            </div>
        </div>
    </div>
</template>

<script>

    //import latestRates from '../assets/rates'
    export default {
        name: "currency-form",
        data() {
            return {
                amount: "",
                result: null,
                items: null,
                items1: null,
                rateFrom: 'EUR',
                rateTo: 'USD',
                rateFromText: '',
            };
        },
        mounted() {
            this.fetchData()
            //console.log(latestRates)
        },
        methods: {
            fetchData: function() {
                let url = 'rates'; // json file with currency rates
                //url  = "https://api.exchangerate.host/latest";
                fetch(url, {
                        headers : {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => response.json())
                    .then(data => (
                        this.items = this.items1 = data.rates
                    ))
                    .catch(error => {
                        console.log(error);
                    });
            },
            // returns rate value from the list
            getCurrencyRate (currency) {
                return this.items[currency];
            },
            // calculate exchange rate
            calculateExchangeRate: function() {
                console.log(this.rateTo+' + '+this.rateFrom);
                let fromRate = this.getCurrencyRate(this.rateFrom);
                let toRate = this.getCurrencyRate(this.rateTo);
                let amount = this.amount; // input amount
                let resultCalc = 0;

                // if its base then multiple else divide rates to make new rate as base
                if(fromRate === 1)
                    resultCalc = toRate;
                else
                    resultCalc = (toRate / fromRate);

                this.rateFromText = '1 '+ this.rateFrom+ ' = '+this.roundCurrency(resultCalc)+' '+this.rateTo;
                resultCalc = resultCalc * amount
                console.table({fromRate,amount,toRate,resultCalc});
                // Rounding to ten thousandths
                this.result = this.roundCurrency(resultCalc);

            },
            // returns rounded vallue to 2 points
            roundCurrency(result) {
               return result ? Math.floor(result * 100) / 100 : null;
            },
            // when currency change
            changeCurrencies(event, curtype) {
                // assignthe rate to relevant currency, and trigger change
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