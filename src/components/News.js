import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0,
            spinner: false
        };
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`;
    }

    capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    async componentDidMount() {
        this.props.setProgress(30);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c308f48344740e899d39444c48a32cc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(50);
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            loading: false,
            totalResults: parsedData.totalResults
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1, spinner: true })
        console.log(this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0c308f48344740e899d39444c48a32cc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            spinner: false
        });
    }

    render() {
        return (
            <>
                <h1 className="text-center my-5">
                    NewsMonkey - Top {this.capitalize(this.props.category)} Headlines
                </h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={this.state.spinner && <Spinner />}
                >
                    <div className="container">
                        <div className="row my-3">
                            {this.state.articles.map((element) => {
                                return (
                                    <div className="col-md-4 my-3">
                                        <NewsItem
                                            title={element.title}
                                            description={element.description}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }
}

export default News;
