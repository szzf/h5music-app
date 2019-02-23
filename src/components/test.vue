<template>
    <div class="wrap">
        <form action="" method="post" id="contactForm" name="contactForm">
            <input ref="focused" @click="touch" type="text" id="contact_name" name="contact_name" value="" class="text" />
            <input type="text" id="contact_email" name="contact_email" value="" class="text" />
            <input type="text" id="contact_phone" name="contact_phone" value="" class="text" />
            <input type="text" id="contact_subject" name="contact_subject" value="" class="text" />
            <input type="text" id="captcha" name="captcha" value="" class="text" />
            <button type="button" @click="btn">Next</button>
        </form>
    </div>
</template>

<script>
export default {
    methods: {

    },
    mounted() {
        // $(document).ready(function () {
        //     var focused = $('input:first'); //this is just to have a starting point
        //     $('button').on('click', function () {
        //         focused.next('input').trigger('touchstart'); //trigger touchstart
        //     });
        //     $('input').on('touchstart', function () {
        //         $(this).focus();
        //         focused = $(this);
        //     });
        // });
        // this.$nextTick(() => {
        // setTimeout(() => {
            var myEvent = new Event('click');
            this.$refs.focused.dispatchEvent(myEvent);
        // }, 500);

        // })

    },
    methods: {
        btn() {
            var myEvent = new Event('click');
            this.$refs.focused.dispatchEvent(myEvent);
            console.log(111111)
        },
        touch(e) {
            e.target.focus()
            console.log('ttttttttttt')
        }
    }
}
</script>

<style>
</style>
