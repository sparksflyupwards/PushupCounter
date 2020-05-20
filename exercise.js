<html>   
   <body> 
        <!-- Load TensorFlow.js --> 
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@0.13.3"></script> 
        <!-- Load BodyPix -->
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/body-pix"></script> 
            bodypix.load().then(function(net) {
                // BodyPix model loaded
            });
        </script>
    </body>
</html>