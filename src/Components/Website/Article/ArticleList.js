import React from 'react';
import { Link } from 'react-router-dom';
import Placeholder from "../../../Assets/Images/image-placeholder.jpg";

export default function ArticleList() {
    return (
        <div className="p-3">
            <h3 className="my-3">Latest Article</h3>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card my-2">
                        <div className="row g-0">
                            <div className="col">
                                <div className="card-body h-100">
                                    <h5 className="card-title">Research Title 1</h5>
                                    <p className="card-text text-clamping">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget est non velit maximus ullamcorper. Nulla eu ex sed mauris ullamcorper sagittis. Cras pretium tortor vel purus commodo scelerisque. Sed dignissim ligula dictum, eleifend nunc et, dapibus lacus. Vivamus et turpis dignissim, tincidunt lectus ac, dictum augue. Vivamus ac est ut dui luctus laoreet non vestibulum nisi. Etiam suscipit vitae sem ut feugiat.

                                        Quisque erat ex, vehicula id tempus molestie, aliquet sit amet dui. Proin ante odio, imperdiet id sem in, vehicula dapibus diam. Morbi eu mi eleifend, fringilla turpis ac, ultrices lorem. Integer aliquet, nisl pulvinar elementum sagittis, ex nisl venenatis sem, at viverra urna mi vel nisi. Integer eu lacinia tortor. Mauris faucibus sollicitudin nisl, ac scelerisque massa facilisis eu. Fusce a sem ante. Donec iaculis aliquam justo, vitae lacinia ex aliquet at. Aliquam euismod velit dui, a interdum mi interdum quis.

                                        Proin porta commodo posuere. Nam pharetra ullamcorper mi, quis ornare ex pulvinar vel. Ut vitae turpis in elit gravida malesuada condimentum tempor sapien. Etiam dignissim vehicula sapien, ut vulputate orci vehicula ut. Proin elit erat, malesuada non mollis pretium, pharetra nec velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed accumsan lorem quis felis luctus lacinia. Morbi posuere purus id turpis blandit, sit amet mattis elit bibendum. In at congue purus. Sed varius consequat dui, scelerisque convallis odio congue vitae.</p>
                                    <span><Link to="#" className="text-primary">...Continue reading</Link></span>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card my-2">
                        <div className="row g-0">
                            <div className="col">
                                <div className="card-body h-100">
                                    <h5 className="card-title">Research Title 2</h5>
                                    <p className="card-text text-clamping">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget est non velit maximus ullamcorper. Nulla eu ex sed mauris ullamcorper sagittis. Cras pretium tortor vel purus commodo scelerisque. Sed dignissim ligula dictum, eleifend nunc et, dapibus lacus. Vivamus et turpis dignissim, tincidunt lectus ac, dictum augue. Vivamus ac est ut dui luctus laoreet non vestibulum nisi. Etiam suscipit vitae sem ut feugiat.

                                        Quisque erat ex, vehicula id tempus molestie, aliquet sit amet dui. Proin ante odio, imperdiet id sem in, vehicula dapibus diam. Morbi eu mi eleifend, fringilla turpis ac, ultrices lorem. Integer aliquet, nisl pulvinar elementum sagittis, ex nisl venenatis sem, at viverra urna mi vel nisi. Integer eu lacinia tortor. Mauris faucibus sollicitudin nisl, ac scelerisque massa facilisis eu. Fusce a sem ante. Donec iaculis aliquam justo, vitae lacinia ex aliquet at. Aliquam euismod velit dui, a interdum mi interdum quis.

                                        Proin porta commodo posuere. Nam pharetra ullamcorper mi, quis ornare ex pulvinar vel. Ut vitae turpis in elit gravida malesuada condimentum tempor sapien. Etiam dignissim vehicula sapien, ut vulputate orci vehicula ut. Proin elit erat, malesuada non mollis pretium, pharetra nec velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed accumsan lorem quis felis luctus lacinia. Morbi posuere purus id turpis blandit, sit amet mattis elit bibendum. In at congue purus. Sed varius consequat dui, scelerisque convallis odio congue vitae.</p>
                                    <span><Link to="#" className="text-primary">...Continue reading</Link></span>
                                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}