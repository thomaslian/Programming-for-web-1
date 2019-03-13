window.addEventListener('load', e => {
    document.querySelector('.add').addEventListener('click', e => {
        const formData = new FormData();
        formData.append('store', 'oeivindk_test');

        formData.append('data', JSON.stringify({ info: "test" }));
        fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/add.php', {
            method: "post",
            body: formData
        }).then(res => res.json())
            .then(data => {
                console.log(data);
            })

        document.querySelector('.hentAlle').addEventListener('click', e => {
            fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/getAll.php?store=oeivindk_test')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        })

        document.querySelector('.endre').addEventListener('click', e => {
            const formData = new FormData();
            formData.append('store', 'oeivindk_test');
            formData.append('idx', 0);
            formData.append('data', JSON.stringify({ hallo: 'verden' }));
            fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/set.php', {
                method: "post",
                body: formData
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        })

        document.querySelector('.slettEn').addEventListener('click', e => {
            fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/remove.php?store=oeivindk_test&idx=0')
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        })

        document.querySelector('.slettHele').addEventListener('click', e => {
            const formData = new FormData();
            formData.append('store', 'oeivindk_test');
            formData.append('idx', 0);
            formData.append('data', JSON.stringify({ hallo: 'verden' }));
            fetch('http://folk.ntnu.no/oeivindk/imt1441/storage/remove.php', {
                method: "post",
                body: formData
            }).then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        })
    })
});