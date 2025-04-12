import Link from "next/link";
import Image from "next/image";

const ArticlesTips = () => {
  const articles = [
    {
      id: 1,
      title: "Essential Home Maintenance Tips for Every Season",
      slug: "essential-home-maintenance-tips",
      image: "https://via.placeholder.com/752x450.jpg?text=Home+Maintenance+Tips",
      date: "April 10, 2025",
      author: "Mike Johnson",
      excerpt: "Learn how to keep your home in top condition year-round with these seasonal maintenance tips.",
      category: "Maintenance"
    },
    {
      id: 2,
      title: "10 DIY Home Repairs Anyone Can Do",
      slug: "diy-home-repairs",
      image: "https://via.placeholder.com/752x450.jpg?text=DIY+Home+Repairs",
      date: "April 5, 2025",
      author: "Sarah Williams",
      excerpt: "Save money with these simple DIY repairs that don't require professional help.",
      category: "DIY"
    },
    {
      id: 3,
      title: "How to Find the Right Handyman for Your Project",
      slug: "find-right-handyman",
      image: "https://via.placeholder.com/752x450.jpg?text=Find+the+Right+Handyman",
      date: "March 28, 2025",
      author: "David Miller",
      excerpt: "Tips for hiring the perfect handyman for your specific home improvement needs.",
      category: "Hiring Tips"
    }
  ];

  return (
    <>
      {articles.map((article) => (
        <div className="col-lg-4" key={article.id}>
          <div className="blog_post">
            <div className="thumb">
              <img
                className="img-fluid w100"
                src={article.image}
                alt={article.title}
                style={{ height: "250px", objectFit: "cover" }}
              />
            </div>
            <div className="details">
              <div className="post_meta">
                <span className="category">{article.category}</span>
                <span className="date">{article.date}</span>
              </div>
              <h4 className="title">
                <Link href={`/blog/${article.slug}`}>{article.title}</Link>
              </h4>
              <p className="para">{article.excerpt}</p>
              <Link href={`/blog/${article.slug}`} className="read-more">
                Read More <span className="flaticon-right-arrow"></span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ArticlesTips;
