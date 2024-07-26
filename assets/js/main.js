var IS_CURRENTLY_LANDSCAPE = true;

function reveal() {
	var reveals = document.querySelectorAll(".reveal");
	
	for (var i = 0; i < reveals.length; i++) {
		var window_height = window.innerHeight;
		var reveal_top = reveals[i].getBoundingClientRect().top;
		var reveal_point = window_height * (IS_CURRENTLY_LANDSCAPE && 0.5 || 0.4);
		
		if (reveal_top < window_height - reveal_point) {
			reveals[i].classList.add("active");
		} else {
			reveals[i].classList.remove("active");
		}
	}
}

window.addEventListener("scroll", reveal);

function MoveImages(is_landscape) {
	IS_CURRENTLY_LANDSCAPE = is_landscape
	
	let anchors = document.querySelectorAll(".img-anchor")
	for (let i = 0; i < anchors.length; i++) {
		let parent = anchors[i].parentElement;
		let img = parent.querySelector(".img-moving")
		if (!img) {
			continue
		}
		
		// Double check instead of just else
		if (img.classList.contains("img-before")) {
			if (is_landscape) {
				// Move to before
				parent.insertBefore(img, anchors[i]);	
			} else {
				// Move to after
				parent.insertBefore(img, anchors[i].nextSibling);
			}
		} else if (img.classList.contains("img-after")) {
			// Nothing
		}
	}
}

let portrait = window.matchMedia("(orientation: portrait)");
portrait.addEventListener("change", function(e) {
	if(e.matches) {
		MoveImages(false);
	} else {
		MoveImages(true);
	}
})

document.addEventListener("DOMContentLoaded", function() {
	MoveImages(window.matchMedia("(orientation: landscape)").matches);
});