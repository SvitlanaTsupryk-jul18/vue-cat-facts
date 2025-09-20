<template>
    <div class="loader-backdrop">
        <div class="loader">
            <svg width="150px" height="150px" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"
                style="background: none;">
                <circle cx="75" cy="50" fill="#6E72EC" r="6.39718">
                    <animate attributeName="r" values="4.8;4.8;7;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="2s"
                        repeatCount="indefinite" begin="-0.875s"></animate>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="-0.875s"
                        repeatCount="indefinite" />

                </circle>
                <circle cx="67.678" cy="67.678" fill="#6E72EC" r="4.8">
                    <animate attributeName="r" values="4.8;4.8;7;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="2s"
                        repeatCount="indefinite" begin="-0.75s"></animate>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="-0.75s"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="75" fill="#6E72EC" r="4.8">
                    <animate attributeName="r" values="4.8;4.8;7;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="2s"
                        repeatCount="indefinite" begin="-0.625s"></animate>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="-0.625s"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="32.322" cy="67.678" fill="#6E72EC" r="4.8">
                    <animate attributeName="r" values="4.8;4.8;7;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="2s"
                        repeatCount="indefinite" begin="-0.5s"></animate>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="-0.5s"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="25" cy="50" fill="#6E72EC" r="4.8">
                    <animate attributeName="r" values="4.8;4.8;7;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="2s"
                        repeatCount="indefinite" begin="-0.375s"></animate>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="-0.375s"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="32.322" cy="32.322" fill="#6E72EC" r="4.80282">
                    <animate attributeName="r" values="4.8;4.8;7;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="2s"
                        repeatCount="indefinite" begin="-0.25s"></animate>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="-0.25s"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="25" fill="#6E72EC" r="6.40282">
                    <animate attributeName="r" values="4.8;4.8;7;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="2s"
                        repeatCount="indefinite" begin="-0.125s"></animate>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="-0.175s"
                        repeatCount="indefinite" />
                </circle>
                <circle cx="67.678" cy="32.322" fill="#6E72EC" r="7.99718">
                    <animate attributeName="r" values="4.8;4.8;7;4.8;4.8" times="0;0.1;0.2;0.3;1" dur="2s"
                        repeatCount="indefinite" begin="0s"></animate>
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loader-backdrop {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: var(--main-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>