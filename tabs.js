function toggleMenu(e) {
  $('.hamburger-icon').toggleClass('open');
  $('.menu-links').toggleClass('open');
};
$(document).ready(() => {  
  // sets earth as a default value
  getData(2);  
  $(".img-div, header, body").addClass("earth");

  $('#overview-btn').addClass('active');
  $('#structure-btn').removeClass('active');
  $('#surface-btn').removeClass('active');
  
  $("#overview-btn").click(() => {
      $('#overview-btn').addClass('active');
      $('#structure-btn').removeClass('active');
      $('#surface-btn').removeClass('active');
      
      $("#overview-img").removeClass('d-none');
      $("#structure-img").addClass('d-none');
      $("#surface-img").addClass('d-none');
  });
   
  $("#structure-btn").click(() => {
    $('#overview-btn').removeClass('active');
    $('#structure-btn').addClass('active');
    $('#surface-btn').removeClass('active');
    
    $("#overview-img").addClass('d-none');
    $("#structure-img").removeClass('d-none');
    $("#surface-img").addClass('d-none');
  });
 
  $("#surface-btn").click(() => {
  $('#overview-btn').removeClass('active');
  $('#structure-btn').removeClass('active');
  $('#surface-btn').addClass('active');
  
  $("#overview-img").removeClass('d-none');
  $("#structure-img").addClass('d-none');
  $("#surface-img").removeClass('d-none');
  });

  $("li a").click((e) => {
    const planet = (e.target.innerText).toLowerCase();
      console.log(planet);
      $(".img-div, header, body").removeClass("mercury");
      $(".img-div, header, body").removeClass("venus");
      $(".img-div, header, body").removeClass("earth");
      $(".img-div, header, body").removeClass("mars");
      $(".img-div, header, body").removeClass("jupiter");
      $(".img-div, header, body").removeClass("saturn");
      $(".img-div, header, body").removeClass("uranus");
      $(".img-div, header, body").removeClass("neptune");
      if (planet === "mercury") { getData(0); $(".img-div, header, body").toggleClass("mercury");}
      else if (planet === "venus") { getData(1); $(".img-div, header, body").toggleClass("venus");}
      else if (planet === "earth") { getData(2); $(".img-div, header, body").toggleClass("earth");}
      else if (planet === "mars") { getData(3); $(".img-div, header, body").toggleClass("mars");}
      else if (planet === "jupiter") { getData(4); $(".img-div, header, body").toggleClass("jupiter");}
      else if (planet === "saturn") { getData(5); $(".img-div, header, body").toggleClass("saturn");}
      else if (planet === "uranus") { getData(6); $(".img-div, header, body").toggleClass("uranus");}
      else if (planet === "neptune") { getData(7); $(".img-div, header, body").toggleClass("neptune");}
  })
    async function getData(index) {
      try {
        const response = await axios.get("./data.json");

        $('#overview-btn').addClass('active');
        $('#structure-btn').removeClass('active');
        $('#surface-btn').removeClass('active');
        $('#overview-img').removeClass('d-none');
        $('#structure-img').addClass('d-none');
        $('#surface-img').addClass('d-none');

        const overviewImg = $("#overview-img");
        const structureImg = $("#structure-img");
        const surfaceImg = $("#surface-img");
        const planetNameText = $("#planet-name");
        const planetDescriptionText = $("#planet-description");
        const sourceURL = $("#source-link");
        const rotationText = $("#rotation");
        const revolutionText = $("#revolution");
        const radiusText = $("#radius");
        const temperatureText = $("#temperature");

        console.log(response.data[0])
        overviewImg.attr("src", response.data[index].images.planet);
        structureImg.attr("src", response.data[index].images.internal);
        surfaceImg.attr("src", response.data[index].images.geology);
        planetNameText.text(response.data[index].name);
        planetDescriptionText.text(response.data[index].overview.content);
        sourceURL.attr("href",response.data[index].overview.source);
        rotationText.text(response.data[index].rotation);
        revolutionText.text(response.data[index].revolution);
        radiusText.text(response.data[index].radius);
        temperatureText.text(response.data[index].temperature);
        $("#overview-btn").click(() => { 
          planetDescriptionText.text(response.data[index].overview.content); 
          sourceURL.attr("href",response.data[index].overview.source);
        })
        $("#structure-btn").click(() => { 
          planetDescriptionText.text(response.data[index].structure.content); 
          sourceURL.attr("href",response.data[index].structure.source);
        })
        $("#surface-btn").click(() => { 
          planetDescriptionText.text(response.data[index].geology.content); 
          sourceURL.attr("href",response.data[index].geology.source);
        })
      } catch (error) {
        console.error(error);
      }
    };  
});