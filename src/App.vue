<template>
    <div class="container">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="box" :style="{'background-color': backgroundColor, 'color': textColor}">
                <div class="box-icon">
                    <img alt="" src="./assets/currency-311743_1280.png" width="80" height="80">
                </div>
                <div class="info">
                    <h4 class="text-center">{{title}}</h4>
                    <currency-form class="container"/>
                  <hr>
                    <div class="row">
                        <div class="col-md-2 offset-1">
                            <a class="btn btn-info" v-on:click="seen = !seen">Theme</a>
                        </div>

                        <div class="col-md-3" v-if="seen" id="hide">
                            <select class="form-control" v-model="backgroundColorSelect" @change="changeBackgroound($event)">
                                <option v-for="(index , item) in colorList" v-bind:key="index" v-bind:value="item"
                                        :style="{ 'color': index.bg }">{{ index.bg }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import currencyForm from "./components/currencyForm";

    export default {
        name: 'App',
        data() {
            return {
                title: 'Currency Converter',
                backgroundColor: "#f8f9fa",
                seen: false,
                backgroundColorSelect: "#f8f9fa",
                configToggle : 'none',
                textColor: "#717171",
                colorList: [
                    {
                  'bg': '#f8f9fa',
                  'tc': '#717171',
                }, {
                  'bg': '#16a085',
                  'tc': '##fff',
                }, {
                  'bg': '#27ae60',
                  'tc': '#fff',
                }, {
                  'bg': '#2c3e50',
                  'tc': '#fff',
                }, {
                  'bg': '#f39c12',
                  'tc': '#717171',
                }, {
                  'bg': '#e74c3c',
                  'tc': '#717171',
                }, {
                  'bg': '#27a9b6',
                  'tc': '#fff',
                },{
                  'bg': '#9b59b6',
                  'tc': '#fff',
                },{
                  'bg': '#73A857',
                  'tc': '#717171',
                },
              ]
            }
        },
        components: {
            currencyForm,
        },
        methods: {
            changeBackgroound(event) {
              let sel = this.colorList[event.target.value];
              this.backgroundColor =  sel.bg;//sel.bg;
              this.textColor = sel.tc;
            },
        }
    }
</script>

<style>

    .box {
        border-radius: 3px;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
        padding: 10px 25px;
        text-align: right;
        display: block;
        margin-top: 60px;
    }

    .box-icon {
        background-color: #edca00;
        border-radius: 50%;
        display: table;
        height: 100px;
        margin: 0 auto;
        width: 100px;
        margin-top: -61px;
    }

    .box-icon span {
        color: #fff;
        display: table-cell;
        text-align: center;
        vertical-align: middle;
    }

    .info h4 {
        font-size: 26px;
        letter-spacing: 2px;
        text-transform: uppercase;
    }

    .info > p {
        color: #717171;
        font-size: 16px;
        padding-top: 10px;
        text-align: justify;
    }

    a {
        background: #03a9f4;
        border-radius: 2px;
        color: #fff;
        transition: all 0.5s ease 0s;
    }

    a:hover {
        background-color: #0288d1;
        color: #fff;
        transition: all 0.5s ease 0s;
    }

    img {
        margin-top: 8px;
        margin-right: 8px;
    }
</style>
