$(document).ready(function () {
    let alphabet = "";

    FindPassLowerLimit();

    $('input[type="checkbox"]').change(function () {
        if ($(this).prop('checked')) {
            alphabet += $(this).val();
            $('#alphabet-power').val(alphabet.length);
            FindPassLength();
            $('#generate-pass').attr('disabled', false);
        }
        else {
            alphabet = alphabet.replace($(this).val(), '');
            if (alphabet != "") {
                $('#alphabet-power').val(alphabet.length);
                FindPassLength();
            }
            else {
                $('#generate-pass').attr('disabled', true);
                $('#alphabet-power').val("");
                $('#pass-length').val("");
            }
        }
    });

    $('#generate-pass').click(function () {
        let passLength = $('#pass-length').val();
        let pass = "";
        for (let i = 0; i < passLength; i++) {
            pass += alphabet[Math.round(Math.random() * (alphabet.length - 1))];
        }
        $('#pass').val(pass);
    });

    $('#probability').change(function () {
        FindPassLowerLimit();
        FindPassLength();
    });

    $('#brute-speed').change(function () {
        FindPassLowerLimit();
        FindPassLength();
    });

    $('#pass-expiration').change(function () {
        FindPassLowerLimit();
        FindPassLength();
    });
});

function FindPassLowerLimit() {
    let P = $('#probability').val();
    let V = $('#brute-speed').val();
    let T = $('#pass-expiration').val();
    let passLowerLimit = Math.ceil(V * T / P);
    $('#pass-lower-limit').val(passLowerLimit);
}

function FindPassLength() {
    let A = $('#alphabet-power').val();
    let passLowerLimit = $('#pass-lower-limit').val();
    let L = 1;
    let S = Math.pow(A, L);
    while (passLowerLimit > S) {
        L++;
        S = Math.pow(A, L);
    }
    $('#pass-length').val(L);
}