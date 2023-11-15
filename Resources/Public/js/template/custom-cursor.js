
window.addEventListener('DOMContentLoaded', (e) => {
    class customCursor extends HTMLDivElement {
        constructor() {
            super();
        }
        connectedCallback() {
            self = this;
            document.body.classList.add("cursor");
            document.addEventListener("mousemove", e => {
                document.body.classList.add("cursor--active");
                this.PosX = e.pageX - window.scrollX;
                this.PosY = e.pageY - window.scrollY;
                window.requestAnimationFrame(this.AnimationFrame.bind(this))
            });

            document.body.addEventListener("mouseenter", e => {
                document.body.classList.add("cursor--active");
            });

            document.body.addEventListener("mouseleave", e => {
                document.body.classList.remove("cursor--active");
            });

            window.StateManager.attach('custom-cursor', this.attachBigCursor.bind(this));
        }

        attachBigCursor(){
            var bigCursor = document.querySelectorAll("a, button, input, select, label, textarea, .list-header");
            bigCursor.forEach( item => {
                item.addEventListener("mouseenter", e => {
                    document.body.classList.add("cursor--ui");

                });
                item.addEventListener("mouseleave", e => {
                    document.body.classList.remove("cursor--ui");
                });
            });
        }
        AnimationFrame(){
            document.body.style.setProperty('--custom-cursor-left', this.PosX+'px');
            document.body.style.setProperty('--custom-cursor-top', this.PosY+'px');
        }

    }


    window.customElements.define(
    'custom-cursor', customCursor,{
        extends: "div"
    });
});