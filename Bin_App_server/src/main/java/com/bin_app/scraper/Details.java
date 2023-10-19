package com.bin_app.scraper;
public class Details {

    private String postcode;
    private String url;
    private String recycling;

    public Details(String recycling) {
        this.postcode = "";
        this.url = "";
        this.recycling = recycling;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getRecycling() {
        return recycling;
    }

    public void setRecycling(String recycling) {
        this.recycling = recycling;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setFullUrl(String url) {
        setUrl("https://www.edinburgh.gov.uk/directory-record/" + url);
    }
}
