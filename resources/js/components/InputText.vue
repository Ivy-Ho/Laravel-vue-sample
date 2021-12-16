<template>
    <div>
        <label v-if="title.length > 0" class="form-label">{{title}}</label>
        <input 
            class="form-control"
            @input="change($event.target.value)" 
            :value="value" 
            :type="type"
            :disabled="disabled"
            :class="{ 'is-invalid' : invalidFeedBack.length > 0 }"
            required
        >
        <div class="invalid-feedback">{{invalidFeedBack}}</div>

    </div>
</template>

<script>
    export default {
        props:{
            title: {
                type: String,
                default: ""
            }, 
            disabled: {
                type: Boolean,
                default: false
            },
            type:{
                type: String,
                default: "text"
            },
            value:{
                type: [String, Number],
                default: function(){
                    if(typeof value === 'number'){
                        return 0
                    }else{
                        return ""
                    }
                }
            },
            invalidFeedBack:{
                type: String,
                default: ""
            },
        },
        methods:{
            change(value){
                this.$emit('input', value);
                this.$emit('change', value);
            }
        }
    }
</script>