import Vue from 'vue'


import ToastComponent from './Toast.vue'


let $vm
const plugin = {
    install(vue, options = {}) {
        const Confirm = vue.extend(ToastComponent)

        if (!$vm) {
            $vm = new Confirm({
                el: document.createElement('div'),
                propsData: {
                    title: ''
                },
            })
            document.body.appendChild($vm.$el)
        }

        const confirm = {
            show(options) {
                $vm.showToast = true
                for (let prop in options) {
                    if (options.hasOwnProperty(prop)) {
                        $vm[prop] = options[prop];
                    }
                  }
                // $vm = Object.assign($vm, options)
                $vm.$off('cancel')
                $vm.$off('success')
                $vm.$on('cancel',() => {
                    return new Promise((resolve, reject) => {
                        if (options.cancel) {
                            options.cancel(window.global, resolve)
                        }
                    }).then(() => {
                        $vm.showToast = false;
                    })
                })
                $vm.$on('success',msg => {
                    return new Promise((resolve, reject) => {
                        options.confirm(window.global, resolve)
                    }).then(() => {
                        $vm.showToast = false;
                    })


                })
            },
            hide() {
                $vm.showToast = false
            }
        }

        // all Vux's plugins are included in this.$vux
        if (!vue.$$messages) {
            vue.$$messages = {
                confirm
            }
        } else {
            vue.$$messages.confirm = confirm
        }

        vue.mixin({
            created: function () {
                this.$$messages = vue.$$messages
            }
        })
    }
}

Vue.use(plugin.install);
