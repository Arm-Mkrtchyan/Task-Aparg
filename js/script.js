
// function for get Flick images with tags
function getFlickJson(tag) {

    // flickr api URL
    var flickApiURL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    $("#flickr_images").empty();

    // JSON for get images
    $.getJSON(flickApiURL, {
        tags: tag,
        tagmode: 'any',
        format: 'json'
    }).done(function (data) {

        $.each(data.items, function (index, item) {
            $("<img>").attr('class', 'draggable ' +  tag).attr("src", item.media.m).appendTo("#flickr_images");

            if (index == 4) {
                return false;
            }
        })
    })
}

function getImages(tags) {
    var tagsArr = tags.split(' ');
    $(".images_folders").empty();
    $.each(tagsArr, function(index, value){
        getFlickJson(tagsArr[index]);
        $("<div>").attr('class', tagsArr[index]+"folder" + ' dropFolder').attr("data-type", '.'+tagsArr[index]).text(tagsArr[index]).appendTo(".images_folders");
        // drag('draggble', tagsArr[index]+"folder");
        $('.' + tagsArr[index]).draggable({containment: ".cont_wrap", revert: true, revertDuration: 1});
        console.log(tagsArr[index])
    });

    setTimeout(function () {
        drag('draggable', 'dropFolder')

    }, 1000)
}

$('.get_images_btn').on('click', function () {
    var searchWords = $('#images_tags').val();
    getImages(searchWords);
});


// drag and drop function
function drag(draggable, droppable) {
    $('.' + draggable).draggable({containment: ".cont_wrap", revert: true, revertDuration: 1});
    $("."+droppable).droppable({
        accept: "."+draggable,
        activeClass: 'droppable-active',
        hoverClass: 'hover',
        drop: function(ev, ui) {
            $(this).append(ui.draggable);//move the image to the folder

        }
    });
}
