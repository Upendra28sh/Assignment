$(document).ready(function() {
  $('input[type="radio"]').click(function() {
    if ($(this).attr("id") == "Specific-Tokens") {
      $("#Specific-Tokens-Div").show();
    } else {
      $("#Specific-Tokens-Div").hide();
    }
  });
});