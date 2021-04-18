$(document).ready(function () {
    let previewColors = {
        color: {red: 0, green: 0, blue: 0},
        "background-color": {red: 255, green: 255, blue: 255}
    };

    let changedProperty = $(".properties__radio").prop("checked") ? "color" : "background-color";

    function sliderRGBString(color, value) {
        const red = color === "red" ? value : 0;
        const green = color === "green" ? value : 0;
        const blue = color === "blue" ? value : 0;

        return `rgb(${red}, ${green}, ${blue})`;
    }

    function propertyRGBString(property) {
        const red = previewColors[changedProperty].red;
        const green = previewColors[changedProperty].green;
        const blue = previewColors[changedProperty].blue;

        return `rgb(${red}, ${green}, ${blue})`;
    }

    const sliderOptions = {
        min: 0, 
        max: 255, 
        range: "max", 
        value: changedProperty === "color" ? 0 : 255,
        slide(event, ui) {
            const previewDiv = $(".container__preview")[0];

            previewColors[changedProperty][this.dataset.color] = ui.value;
            previewDiv.style[changedProperty] = propertyRGBString(changedProperty);

            this.style["background-color"] = sliderRGBString(this.dataset.color, ui.value);
        }
    }

    $("#slider-red").slider(sliderOptions);
    $("#slider-green").slider(sliderOptions);
    $("#slider-blue").slider(sliderOptions);

    $(".properties__radio").checkboxradio({ icon: false });
    $(".properties__radio").on("change", function() {
        if (this.checked) {
            changedProperty = this.value;

            for (color in previewColors[changedProperty]) {
                const slider = $(`#slider-${color}`);

                slider.slider("option", "value", previewColors[changedProperty][color]);

                slider[0].style["background-color"] = sliderRGBString(
                    slider[0].dataset.color, 
                    previewColors[changedProperty][color]);
            }   
        }
    });
});
