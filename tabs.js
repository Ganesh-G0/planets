function toggleMenu(e) {
  $('.hamburger-icon').toggleClass('open');
  $('.menu-links').toggleClass('open');
};
$(document).ready(() => {  
  getData(2);  // sets earth as a default value

  $('#overview-btn').addClass('active');
  $('#structure-btn').removeClass('active');
  $('#surface-btn').removeClass('active');
  
  $(".header-btn").click(function (e) {
    const input = e.target.value;
    if (input === "overview") {
      $('#overview-btn').addClass('active');
      $('#structure-btn').removeClass('active');
      $('#surface-btn').removeClass('active');
      
      $("#overview-img").removeClass('d-none');
      $("#structure-img").addClass('d-none');
      $("#surface-img").addClass('d-none');
    } else if (input === "structure") {
      $('#overview-btn').removeClass('active');
      $('#structure-btn').addClass('active');
      $('#surface-btn').removeClass('active');        
      
      $("#overview-img").addClass('d-none');
      $("#structure-img").removeClass('d-none');
      $("#surface-img").addClass('d-none');

    } else if (input === "surface") {
      $('#overview-btn').removeClass('active');
      $('#structure-btn').removeClass('active');
      $('#surface-btn').addClass('active');
      
      // $("#overview-img").addClass('d-none');
      $("#overview-img").removeClass('d-none');
      $("#structure-img").addClass('d-none');
      $("#surface-img").removeClass('d-none');
    }
  });
    $("li a").click((e) => {
      const planet = (e.target.innerText).toLowerCase();
      console.log(planet);
      if (planet === "mercury") { getData(0); }
      else if (planet === "venus") { getData(1); }
      else if (planet === "earth") { getData(2); }
      else if (planet === "mars") { getData(3); }
      else if (planet === "jupiter") { getData(4); }
      else if (planet === "saturn") { getData(5); }
      else if (planet === "uranus") { getData(6); }
      else if (planet === "neptune") { getData(7); }
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