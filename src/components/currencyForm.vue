<template>
    <div id="currency-form"  style="text-align: left !important;">
        <p class="raftefromtext">{{ rateFromText }}</p>
        <div class="row">
            <div class="col-md-3 offset-2">
                <select id="fromCur" class="form-control" v-model="rateFrom" @change="changeCurrencies($event,'from')" ref="fromCur">
                    <option v-for="(item, index) in items" v-bind:key="item" v-bind:value="index">{{ index }}</option>
                </select>
            </div>
            <div class="col-md-5">
                <input type="number"  min="0.01" step="0.01"  id="fromAmount" placeholder="From" class="form-control" ref="amount" v-model="amount" v-on:change="calculateExchangeRate">
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-3 offset-2">
                <select id="toCur" class="form-control" v-model="rateTo" @change="changeCurrencies($event,'to')" ref="toCur">
                    <option v-for="(item, index) in items1" v-bind:key="item" v-bind:value="index">{{ index }}</option>
                </select>
            </div>
            <div class="col-md-5">
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
        },
        methods: {
            // fetch json data for rates
            fetchData () {
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
            calculateExchangeRate () {
                let fromRate = this.getCurrencyRate(this.rateFrom);
                let toRate = this.getCurrencyRate(this.rateTo);
                if(this.amount < 0) // check for negative
                    this.amount = Math.abs(this.amount);

                let amount = this.amount; // input amount
                let resultCalc = 0;

                // if its base then multiple else divide rates to make new rate as base
                if(fromRate === 1)
                    resultCalc = toRate;
                else
                    resultCalc = (toRate / fromRate);

                this.rateFromText = '1 '+ this.rateFrom+ ' = '+this.roundCurrency(resultCalc)+' '+this.rateTo;
                resultCalc = resultCalc * amount;
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
    h4 {
        font-size: 18px !important;
    }
    .raftefromtext {
        text-align: center;
    }
</style>0