$(document).ready(function () {
    $(".fancybox").fancybox({
        beforeShow: function () {
            var alt = this.element.find('img').attr('alt');
            this.inner.find('img').attr('alt', alt);
            this.title = alt;
        }
    });       
    
    $(".various").fancybox({
        fitToView: false,
        autoSize: true,
        closeClick: true,
        openEffect: 'none',
        closeEffect: 'none'
    });
});