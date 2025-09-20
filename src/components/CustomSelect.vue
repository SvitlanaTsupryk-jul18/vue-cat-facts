<template>
    <div class="select" @blur="open = false">
        <div class="select__selected" :class="{ open: open }" @click="open = !open">
            <span>{{ selected.text }}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">    <path        d="M14.4694 20.0307L6.96945 12.5307C6.89971 12.461 6.84439 12.3783 6.80665 12.2873C6.76891 12.1962 6.74948 12.0986 6.74948 12.0001C6.74948 11.9015 6.76891 11.8039 6.80665 11.7128C6.84439 11.6218 6.89971 11.5391 6.96945 11.4694L14.4694 3.96943C14.6102 3.8287 14.801 3.74963 15.0001 3.74963C15.1991 3.74963 15.39 3.8287 15.5307 3.96943C15.6714 4.11016 15.7505 4.30103 15.7505 4.50005C15.7505 4.69907 15.6714 4.88995 15.5307 5.03068L8.56038 12.0001L15.5307 18.9694C15.6004 19.0391 15.6557 19.1218 15.6934 19.2129C15.7311 19.3039 15.7505 19.4015 15.7505 19.5001C15.7505 19.5986 15.7311 19.6962 15.6934 19.7872C15.6557 19.8783 15.6004 19.961 15.5307 20.0307C15.461 20.1004 15.3783 20.1556 15.2872 20.1933C15.1962 20.2311 15.0986 20.2505 15.0001 20.2505C14.9015 20.2505 14.8039 20.2311 14.7129 20.1933C14.6219 20.1556 14.5391 20.1004 14.4694 20.0307Z"  fill="#434343" /></svg>
        </div>
        <div class="select__options" :class="{ selectHide: !open }">
            <div v-for="(option, i) of options" :key="i" :class="{ selectedOption: option === selected }"
                @click="selectOption(option)">
                <span> {{ option.text }}</span>
                <svg v-show="option === selected" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5307 7.28062L9.53068 19.2806C9.46102 19.3503 9.3783 19.4057 9.28726 19.4434C9.19621 19.4812 9.09861 19.5006 9.00005 19.5006C8.90149 19.5006 8.80389 19.4812 8.71285 19.4434C8.6218 19.4057 8.53908 19.3503 8.46943 19.2806L3.21943 14.0306C3.0787 13.8899 2.99963 13.699 2.99963 13.5C2.99963 13.301 3.0787 13.1101 3.21943 12.9694C3.36016 12.8286 3.55103 12.7496 3.75005 12.7496C3.94907 12.7496 4.13995 12.8286 4.28068 12.9694L9.00005 17.6897L20.4694 6.21936C20.6102 6.07863 20.801 5.99957 21.0001 5.99957C21.1991 5.99957 21.3899 6.07863 21.5307 6.21936C21.6714 6.36009 21.7505 6.55097 21.7505 6.74999C21.7505 6.94901 21.6714 7.13988 21.5307 7.28062Z" fill="#6E72EC"/></svg>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['options', 'defaultOption'],
    data() {
        return {
            selected: this.defaultOption
                ? this.defaultOption
                : this.options.length > 0
                    ? this.options[0]
                    : null,
            open: false,
        };
    },
    mounted() {
        if (this.default) {
            this.selected = this.default;
        } else if (this.options && this.options.length > 0) {
            this.selected = this.options[0];
        }
        if (this.selected) {
            this.$emit("input", this.selected.option);
        }
    },
    watch: {
        options(newOpts) {
            // In case options are loaded async and selected is not set
            if (!this.selected && newOpts && newOpts.length > 0) {
                this.selected = newOpts[0];
                this.$emit("input", this.selected.option);
            }
        }
    },
    methods: {
        selectOption(option) {
            this.selected = option;
            this.open = false;
            this.$emit('input', option.option);
        }
    }
};
</script>

<style scoped>
.select {
    position: relative;
    width: 300px;
    text-align: left;
    outline: none;
    height: 48px;
    line-height: 48px;

    .select__selected {
        background-color: var(--input-bg);
        border-radius: 6px;
        height: 48px;
        line-height: 48px;
        color: var(--text-color);
        padding-left: 12px;
        margin-bottom: 6px;
        cursor: pointer;
        user-select: none;
        display: flex;
        justify-content: space-between;

        svg {
            display: block;
            margin: 12px 16px;
            transition: all .3s;
            transform: rotate(-90deg);

            path {
                fill: var(--arrow-color);
            }
        }

        &.open svg {
            transform: rotate(90deg);
        }
    }

    .select__options {
        overflow: hidden;
        position: absolute;
        background-color: var(--input-bg);
        border-radius: 6px;
        left: 0;
        right: 0;
        z-index: 1;

        div {
            display: flex;
            justify-content: space-between;
            color: var(--select-color);
            padding-left: 12px;
            cursor: pointer;
            user-select: none;
            transition: all .2s;

            &:hover {
                background-color: var(--hover-input);
            }

            &.selectedOption {
                color: var(--selected-color);
            }

            svg {
                display: inline-block;
                margin: 12px 16px;

                path {
                    fill: var(--selected-color);
                }
            }
        }
    }
}

.selectHide {
    display: none;
}
</style>