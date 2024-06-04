document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    localStorage.setItem('userName', name);
    document.getElementById('userName').textContent = name;
    window.location.href = "main.html";
    startQuiz();
});