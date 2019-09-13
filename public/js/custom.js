function rewriteCharacters(vueVar, ev) {
    let toto = vueVar.$data.save.nfc_id;
    switch (ev.keyCode) {
        case 48:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '0';
            break;
        case 49:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '1';
            break;
        case 50:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '2';
            break;
        case 51:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '3';
            break;
        case 52:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '4';
            break;
        case 53:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '5';
            break;
        case 54:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '6';
            break;
        case 55:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '7';
            break;
        case 56:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '8';
            break;
        case 57:
            ev.preventDefault();
            vueVar.$data.save.nfc_id = toto + '9';
            break;
    }
}

$(document).ready(function () {
    $('#add__nfc_id').keydown(function (e) {
        rewriteCharacters(permission, e);
    });
    $('#edit__nfc_id').keydown(function (e) {
        rewriteCharacters(permission, e);
    });
});


