// find post edit form
let postEditForm = document.getElementById('postEditForm');
// add submit listener to post edit form
postEditForm.addEventListener('submit', function (event) {
	// find length of uploaded images
	let imageUploads = document.getElementById('imageUpload').files.length;
	// find total number of existing images
	let existingImgs = document.querySelectorAll('.imageDeleteCheckbox').length;
	// find total number of potential deletions
	let imgDeletions = document.querySelectorAll('.imageDeleteCheckbox:checked')
		.length;
	// figure out if the form can be submitted or not
	let newTotal = existingImgs - imgDeletions + imageUploads;
	if (newTotal > 10) {
		event.preventDefault();
		let removalAmt = newTotal - 10;
		alert(
			`You need to delete at least ${removalAmt} (more) image${removalAmt ===
			1
				? ''
				: 's'}!`
		);
	}
});
