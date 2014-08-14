(function(){
  'use strict';

  $(document).ready(function(){
    $('.nameAsset').on(sellAsset);
  });

  function sellAsset(e){
    var id    = $(this).closest('.gambler').attr('data-gambler-id'),
        asset = $(this).children().text();

    console.log(id , asset);
    e.preventDefault();
  }
}
)();

