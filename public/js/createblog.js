const blogForm = document.querySelector(".blog-form");
const createBtn = document.querySelector('#create-btn');

const showBlogForm = () => {
    blogForm.style.display = 'block';
    createBtn.style.display = 'none';

}

const blogFormHandler = async (event) => {
    event.preventDefault();
    document.querySelector
    console.log("creating a blog")

    const blog_title = document.querySelector('#blog-title').value.trim();
    const blog_description = document.querySelector('#blog-description').value.trim();

    if (blog_title && blog_description) {
        const response = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify({ blog_title, blog_description }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Failed to create blog.');
        }
    }
};

document.querySelector('.blog-form').addEventListener('submit', blogFormHandler);
document.querySelector('#create-btn').addEventListener('click', showBlogForm);