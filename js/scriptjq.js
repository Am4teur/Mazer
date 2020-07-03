$(document).ready(function(){

    doSome();

    // function for button step by step
    $("#btn_step_by_step").click(function() {
        stepByStep();
    });

    // function for button redraw
    $("#btn_redraw").click(function() {
        redraw();
    });

});

$(document).on("click", ".menu-trigger", function() {
    if($(this).hasClass("active"))
    {
        $(this).removeClass("active");
        $(".aside").removeClass("active");
    }
    else
    {
        $(this).addClass("active");
        $(".aside").addClass("active");
    }
})




//$().button('toggle')

//$().button('dispose');
