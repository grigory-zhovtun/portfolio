window.addEventListener('DOMContentLoaded', () => {

    // Form 
    $('form').submit(function (e) {
        e.preventDefault();

        // if(!$(this).valid()) {
        //     return;
        // }

        $.ajax({
            type: 'POST',
            url: 'mailer/smart.php',
            data: $(this).serialize()
        }).done(function() {
            $(this).find('input').val('');

            $('form').trigger('reset');
        });
        return false;
    }); 

});