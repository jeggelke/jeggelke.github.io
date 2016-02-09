$(document).ready(function(){
// fix nav placement
var fixNavPlacement = function(){
  var heightAdj = $('.ss-prev').outerHeight()/2;
  $('.ss-nav').css('margin-top', heightAdj * -1);
};
fixNavPlacement();

// fix container height
var fixContainerHeight = function(){
  var imgHeight = $('.ss-image').height();
  $('.ss-image-container').height(imgHeight);
};
fixContainerHeight();

// fix caption padding
var fixCaptionPadding = function() {
  var containerWidth = $('.ss-container').width();
  $('.ss-caption').width(containerWidth - 20);
  $('.ss-caption').css('padding', 10);
};
fixCaptionPadding();

// Set Module Container Width
$('.ss-prev').click(function(){console.log(this);});
$('.ss-next').click(function(){console.log(this);});
});

function getFiles(dir){
    fileList = [];

    var files = fs.readdirSync(dir);
    for(var i in files){
        if (!files.hasOwnProperty(i)) continue;
        var name = dir+'/'+files[i];
        if (!fs.statSync(name).isDirectory()){
            fileList.push(name);
        }
    }
    return fileList;
}
