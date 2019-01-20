// function for get Flick images with tags
function getFlickJson(tag) {

    // flickr api URL
    var flickApiURL = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    // JSON for get images
    $.getJSON(flickApiURL, {
        tags: tag,
        tagmode: 'any',
        format: 'json'
    }).done(function (data) {

        $.each(data.items, function (index, item) {

            // add 5 pieces image by tag
            $("<img>").attr('class', 'draggable ' + tag).attr("src", item.media.m).appendTo("#flickr_images");

            if (index == 4) {
                return false;
            }
        })
    })
}

function getImages(tags) {
    var tagsArr = tags.split(' ');

    // clear the old blocks before adding new images
    $("#flickr_images").empty();
    $(".images_folders").empty();
    $(".images_folders_content").empty();
    $('.success_message').fadeOut().removeClass('active_massage');

    $.each(tagsArr, function (index, value) {
        getFlickJson(tagsArr[index]);
        // generate folders to move
        $("<div>").attr('class', 'dropFolder').attr("data-type", tagsArr[index]).text(tagsArr[index]).appendTo(".images_folders");
        // generate folders to keep images
        $("<div>").attr('class', tagsArr[index] + "folder photos_basket").appendTo(".images_folders_content");
    });

    setTimeout(function () {

        // make the images moveable
        $('.draggable').draggable({
            revert: "invalid", // when not dropped, the item will revert back to its initial position
            containment: "document", // images moving area
            helper: "clone", // moving type
            start: function (e, ui) {
                $(this).addClass('draggingImg');
            },
            stop: function (e, ui) {
                $(this).removeClass('draggingImg');
            },
            cursor: 'move'
        });

        // drop images in folders
        $(".dropFolder").droppable({
            hoverClass: "hover",
            activeClass: "active",
            drop: function (event, ui) {
                var $item = ui.draggable;
                var folderType = $(this).attr('data-type');

                // drop, if categories match
                if ($item.hasClass(folderType)) {
                    $item.appendTo($('.' + folderType + 'folder'));
                    $item.removeClass('draggingImg');

                    // appearance of the message
                    if($('#flickr_images img').length == 1){
                        $('.success_message').fadeIn().addClass('active_massage');
                    }
                }
            }
        });
    }, 1500)
}

// click for the search button
$('.get_images_btn').on('click', function () {
    var searchWords = $('#images_tags').val();
    getImages(searchWords);
});

//click for images folder
$(document).on('click', '.dropFolder', function () {
    var activeFolder = $(this).attr('data-type');
    $('.photos_basket').hide();
    $('.'+activeFolder+('folder')).fadeIn();
});