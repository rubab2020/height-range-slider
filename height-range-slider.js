jQuery(document).ready(function(){
  "use strict"; 
  
  // ------------ height range --------------------
  const decimalPointArray = ['00', '08', '17', '25', '33', '42', '50', '58', '67', '75', '83', '92'];

  let convertCentemeterToFeet = function(value) {
    const oneFeetInCentemeter = 30.48;
    let toFeet = value/oneFeetInCentemeter;
    return toFeet.toFixed(2);    
  }

  let formatToReadableFeet = function(value) {
    const floatString = `${value}`;
    const findPos = floatString.indexOf('.');
    if(findPos >= 0) {
      const decimalNum = floatString.substr(0, findPos);
      const decimalPointNum = floatString.substr(findPos+1);
      for(let i = 0; i < decimalPointArray.length; i++) {
        if(decimalPointArray[i] == decimalPointNum){
          return `${decimalNum}'${i}"`;
        }
      }
    }
    return `${floatString}'`;
  }

  const oneFootInCentemeter = 2.54;
  const fourFeet = 48;
  const eightFeet = 96;
  let centemeterMin = fourFeet*oneFootInCentemeter;
  let centemeterMax = eightFeet*oneFootInCentemeter;
  let heightRangeOutput = $("#heightRangeOutput");
  let heightRangeSlider = $("#heightRangeSlider");
  let expHeightStart = parseInt($("input[name='expect_height_start']").val());
  let expHeightEnd = parseInt($("input[name='expect_height_end']").val());
  heightRangeSlider.slider({
    range:true,
    min:centemeterMin,
    max:centemeterMax,
    values:[
      expHeightStart ? expHeightStart : centemeterMin, 
      expHeightEnd ? expHeightEnd : centemeterMax
    ],
    step:oneFootInCentemeter,
    slide:function(event, ui){
      heightRangeOutput.html(
        formatToReadableFeet(convertCentemeterToFeet(ui.values[0]))
        +' - '
        +formatToReadableFeet(convertCentemeterToFeet(ui.values[1]))
      );
      $("#heightMin").val(Math.round(ui.values[0]));
      $("#heightMax").val(Math.round(ui.values[1]));
    }
  });
  heightRangeOutput.html(
    formatToReadableFeet(convertCentemeterToFeet(heightRangeSlider.slider("values",0)))
    +' - '
    +formatToReadableFeet(convertCentemeterToFeet(heightRangeSlider.slider("values",1)))
  );
  $("#heightMin").val(heightRangeSlider.slider('values', 0));
  $("#heightMax").val(heightRangeSlider.slider('values', 1));
});
