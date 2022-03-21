/**
 * On every completed barcode scane, read barcode
 * and show it on the barcode reader view and regenerate
 * the barcode based on the scanned code.
 * 
 * @param [Html_Element_Id] barcodeTextInputId
 * @param [Html_Element_Id] barcodeSvgWrapperId 
 * 
 * @return void
 */
function activateBarCodeScanner( barcodeTextInputId, barcodeSvgWrapperId ) {
    var barcode = '';
    var interval ;

    $(document).keydown(function( event ){
        if( interval ) { clearInterval( interval ); }

        if( event.code == "Enter" ) {
            if( barcode ) {
                handleBarcode( barcode );
            }
            barcode = '';
            return;
        }

        if( event.code != 'Shift' ) { barcode += event.key; }

        interval = setInterval( () => barcode = '', 20 );

        /**
         * Handle barcode result on successed.
         * @param [String] scanned_barcode
         * @return void
         */
        function handleBarcode( scanned_barcode ) {
            // show the coded result
            $(barcodeTextInputId).val( scanned_barcode );

            // generate barcode symbol
            JsBarcode( barcodeSvgWrapperId, scanned_barcode );
        }

    });

}

/**
 * On generated barcode button clicked, generate barcode symbol based on 
 * value input inside barcode text input element.
 * 
 * @param [Html_Element_Id] randomBtnId
 * @param [Html_Element_Id] barcodeTextInputId
 * @param [Html_Element_Id] barcodeSvgWrapperId 
 * 
 * @return void
 */
function onGenerateButtonClickedGenerateBarcodeBaseOnInput( generateBtnId, barcodeTextInputId, barcodeSvgWrapperId ) {
    $(generateBtnId).on('click', function(){
        var barcodeTextInputValue = $(barcodeTextInputId).val();

        if( barcodeTextInputValue.length == 0 ) {
            alert('Can not generate barcode symbol without value, please enter at lease one value and try again!');
            return false;
        }

        // generate barcode symbol based on random barcode
        JsBarcode( barcodeSvgWrapperId, barcodeTextInputValue );

    });
}

/**
 * On randome button clicked generate random barcode and place into 
 * current barcode only text and barcode only symbol.
 * 
 * @param [Html_Element_Id] randomBtnId
 * @param [Html_Element_Id] barcodeTextInputId
 * @param [Html_Element_Id] barcodeSvgWrapperId 
 * @param [Integer]         barcodeLenght
 * 
 * @return void
 */
function StrongAlgorithm_onRandomButtonClickedGenerateRandomBarcode( randomBtnId, barcodeTextInputId, barcodeSvgWrapperId, barcodeLenght){
    $(randomBtnId).on('click', function(){
        var barcodeResult = '';

        // arrow function
        var randomchar = () => {
            var charCode = Math.floor( Math.random() * 62 );

            // 1 <-> 10
            if (charCode < 10) return charCode;

            // A <-> Z
            if (charCode < 36) return String.fromCharCode(charCode + 55);

            // a <-> z
            return String.fromCharCode(charCode + 61);
        }

        while( barcodeResult.length < barcodeLenght ) {
            barcodeResult += randomchar();
        }

        // replace reandom to barcode text input
        $(barcodeTextInputId).val( barcodeResult );

        // generate barcode symbol based on random barcode
        JsBarcode(barcodeSvgWrapperId, barcodeResult);

    });
}
