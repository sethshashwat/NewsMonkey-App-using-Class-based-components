import React, { Component } from "react";

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <>
                <div>
                    <div className="card">
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "1", left: "90%" }}>
                            {source}
                        </span>
                        <img src={!imageUrl ? "https://img.etimg.com/thumb/msid-110054067,width-1200,height-630,imgsize-110642,overlay-etmarkets/photo.jpg" : imageUrl}
                            className="card-img-top"
                            alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                            <a href={newsUrl} className="btn btn-dark" target="_blank" rel="noreferrer">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default NewsItem;
