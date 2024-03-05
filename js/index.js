$(function(){
    setTimeout(function(){
        $("html,body").scrollTop(0);
    },200)

    $(".close-pannel-btn").on('click', function(){
        $(".overlay-content").addClass('hide');
        $("html,body").removeClass('lock-scroll');
    })

    $(".show-page-btn").on('click', function(){
        $("#overlay .overlay-content").addClass('zoomIn');
        setTimeout(() => {
            window.location = $(this).data('url');
        },5000);
    })

    gsap.timeline({
        scrollTrigger: {
            trigger: "#overlay",
            start: "top top",
            end: "bottom top",
            markers: false,
            scrub: 1,
            onLeaveBack: () => {
                $("#overlay .overlay-content").removeClass('hide');
                $("html,body").addClass('lock-scroll');
            },
        }
    })
    .to("#overlay", {
        opacity: 0,
        duration: 5 
    }, 'stage1')
    .to("#overlay", {
        display: 'none',
    }, 'stage2');
})