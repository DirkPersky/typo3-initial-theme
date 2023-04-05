window.AnimateManager.attach('referenzen-hover', function () {
    const wrapper = document.querySelectorAll(".referenzen");
    wrapper.forEach(wraps => {
        wraps.addEventListener("mousemove", eventHandle);
        wraps.addEventListener("dragover", eventHandle);
        function eventHandle($event){
            let cards = wraps.querySelectorAll(".referenz-item ");

            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                let x = $event.clientX - rect.left;
                let y = $event.clientY - rect.top;
                // check if in box
                if (
                    $event.clientX >= rect.left && $event.clientX <= rect.right &&
                    $event.clientY >= rect.top && $event.clientY <= rect.bottom
                ) {
                    card.style.setProperty("--xPos", `${x}px`);
                    card.style.setProperty("--yPos", `${y}px`);
                } else {
                    card.style.setProperty("--xPos", `0`);
                    card.style.setProperty("--yPos", `0`);
                }
            });
        }
    });
});