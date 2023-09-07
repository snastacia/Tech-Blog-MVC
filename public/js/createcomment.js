const commentForm = document.querySelector(".comment-form");
const commentBtn = document.querySelector('.submit-comment');

// create comment
const commentFormHandler = async (event) => {
    event.preventDefault();
    document.querySelector

    const comment_description = document.querySelector('#comment-description').value.trim();

    if (comment_description) {
        var id = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]
        const response = await fetch(`/api/comments/blog/${id}/comments`, {
            method: 'POST',
            body: JSON.stringify({ comment_description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to post comment.')
        }
    }
};

commentForm.addEventListener('submit', commentFormHandler);