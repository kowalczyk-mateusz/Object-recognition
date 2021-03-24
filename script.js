var modelHasLoaded = false;
var model = undefined;

cocoSsd.load().then(function(loadedModel){
    model = loadedModel;
	modelHasLoaded = true;
});

const holderOfImage = document.getElementsByClassName('imageContainer');

for(let i = 0; i<holderOfImage.length; i++){
    holderOfImage[i].children[0].addEventListener('click', handleClick);
}

function handleClick(e){
    if(!modelHasLoaded){
        return;
    }
    model.detect(e.target).then(function(predictions){
        for(let i = 0; i < predictions.length; i++){
            const p = document.createElement('p');
            p.innerText =
             predictions[i].class +
            ' - with ' +
            Math.round(parseFloat(predictions[i].score) * 100) +
            '% of confidence.';
            p.style =
             'margin-left: ' +
            predictions[i].bbox[0] + 
            'px; margin-top: ' +
            (predictions[i].bbox[1] - 10) + 
            'px; width: ' + 
            (predictions[i].bbox[2] - 10) + 
            'px; top: 0; left: 0;';

            const objectBorder  = document.createElement('div');
            objectBorder .setAttribute('class', 'objectBorder');
            objectBorder .style = 
            'left: ' +
            predictions[i].bbox[0] +
            'px; top: ' +
            predictions[i].bbox[1] +
            'px; width: ' + 
            predictions[i].bbox[2] + 
            'px; height: ' +
            predictions[i].bbox[3] +
            'px;';


            e.target.parentNode.appendChild(objectBorder );
            e.target.parentNode.appendChild(p);
        }
    })
}


const btn = document.querySelector('.btn')
btn.addEventListener('click',()=>{
    let allDivs = document.querySelectorAll('div')
    let image = document.querySelector('.image')
    let paragraphs = document.querySelectorAll('p')
    console.log(paragraphs)
    console.log(paragraphs.length)
    let imageUrl = document.getElementById('imageUrl').value
    allDivs.forEach(el =>{
        if(el.classList.contains('objectBorder')){
            let objectBorder = document.querySelector('.objectBorder')
            objectBorder.remove();

        }
    })
    if(paragraphs.length !== 0){
        paragraphs.forEach(el => el.remove());
    }
    image.src = imageUrl
})