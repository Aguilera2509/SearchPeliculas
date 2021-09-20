const d = document,
    $template = d.getElementById("shows-template").content,
    $section = d.getElementById("shows-section"),
    $fragment = d.createDocumentFragment();

d.addEventListener("keypress", (e)=>{
    if(e.target.matches("#search")){
        if(e.key === "Enter"){
            $section.innerHTML= `<img src="assets/ball-triangle.svg" alt="Cargando..." class="loader">`;

            let query = e.target.value.toLowerCase();

            fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
            .then((res)=>{
                //console.log(res);
                return res.ok?res.json():Promise.reject(res);
            })
            .then((res2)=>{
                //console.log(res2);

                if(res2.length === 0){
                    $section.innerHTML = `<h3>No se encontrado resultados para busqueda: <mark>${query}</mark></h3>`;
                }else{
                    res2.forEach(el => {
    
                        $template.querySelector("h3").textContent = `${el.show.name} ---- ${el.show.premiered?el.show.premiered:"Sin Fecha"}`;
                        $template.querySelector("div").innerHTML = el.show.summary?el.show.summary:"<p>Sin descripcion</p>";
                        $template.querySelector("img").src = el.show.image?el.show.image.medium:"https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                        $template.querySelector("img").alt = el.show.name;
                        $template.querySelector("a").textContent = el.show.url?"Ver mas...":"";
                        $template.querySelector("a").target = el.show.url?"_blank":"_self";
                        $template.querySelector("a").href = el.show.url?el.show.url:"#";
    
                        let $clone = d.importNode($template,true);
                        $fragment.appendChild($clone);
                    });
    
                    $section.innerHTML = "";
                    $section.appendChild($fragment);
                }

            })
            .catch((err)=>{
                console.log(err);
            })

        }
    }
})