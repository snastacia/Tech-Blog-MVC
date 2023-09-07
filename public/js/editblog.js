const editBtn = document.querySelector('#edit-btn');
const deleteBtn = document.querySelector('#delete-btn');

//edit blog
const handleEditBlog = async (event) => {
    event.preventDefault()
    const blog_title = document.querySelector('#blog-title').value.trim();
    const blog_description = document.querySelector('#blog-description').value.trim();
    if (blog_title && blog_description) {
        var id = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ blog_title, blog_description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to sign up.');
        }
    }
}

editBtn.addEventListener("click", function (event) {
    var form = document.querySelector(".blog-form")
    form.style.display = "block"
    form.addEventListener("submit", handleEditBlog)
})

deleteBtn.addEventListener("click", async function (event) {
    var id = window.location.pathname.split("/")[window.location.pathname.split("/").length - 1]
    const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace("/dashboard")
    } else {
        alert('Failed to delete the post.');
    }
})

