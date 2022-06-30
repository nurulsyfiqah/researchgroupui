import React from 'react';
import Placeholder from '../../../Assets/Images/image-placeholder.jpg'
import { SocialIcon } from 'react-social-icons';

export default function About() {
    return (
        <div className="p-3">
            <div className="row mt-4">
                <div className="col-md-3 mb-1">
                    <img
                        src= {Placeholder}
                        alt="resgm-logo"
                        height="140em"
                        className="d-inline-block align-text-top mt-1 mb-1 nav_logo mx-auto d-block"
                    />
                </div>
                <div className="col-md-9 align-self-center">
                    <h3 className="text-bold">Nurul Syfiqah</h3>
                    <h5>Penultimate Software Engineering Student in University Malaya</h5>
                    <div className="row justify-content-lg-start">
                        <SocialIcon url="https://twitter.com/" style={{ height: 30, width: 30 }} className="mx-2" />
                        <SocialIcon url="https://facebook.com/" style={{ height: 30, width: 30 }} className="mx-2"  />
                        <SocialIcon url="https://linkedin.com/" style={{ height: 30, width: 30 }} className="mx-2"  />
                        <SocialIcon url="https://discord.com/" style={{ height: 30, width: 30 }} className="mx-2"  />
                        <SocialIcon url="https://scholar.google.ca" style={{ height: 30, width: 30 }} className="mx-2" />
                        <SocialIcon url="https://github.com/" style={{ height: 30, width: 30 }} className="mx-2" />
                    </div>
                </div>
            </div>

            <div className="text-justify mt-2">
                Proin porta commodo posuere. Nam pharetra ullamcorper mi, quis ornare ex pulvinar vel. Ut vitae turpis in elit gravida malesuada condimentum tempor sapien. Etiam dignissim vehicula sapien, ut vulputate orci vehicula ut. Proin elit erat, malesuada non mollis pretium, pharetra nec velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed accumsan lorem quis felis luctus lacinia. Morbi posuere purus id turpis blandit, sit amet mattis elit bibendum. In at congue purus. Sed varius consequat dui, scelerisque convallis odio congue vitae.

                Sed pellentesque pharetra quam ac sodales. Etiam lorem risus, efficitur vitae facilisis eget, efficitur luctus turpis. Nunc gravida pretium massa, non posuere lectus gravida eu. Fusce fringilla pulvinar massa, non sagittis velit. Praesent vel nisi id quam imperdiet consequat eget et massa. Donec dapibus, libero sit amet viverra pharetra, quam erat condimentum risus, vel pharetra leo ex tincidunt purus. Fusce convallis sollicitudin nibh ut luctus. Aenean venenatis iaculis turpis non tempus. Aliquam eu facilisis lorem.
            </div>

            <hr/>
            <div className="mt-2">
                <h3 className="my-2">Highlight</h3>
                <div className="card my-2">
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={Placeholder} className="img-thumbnail rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-9">
                            <div className="card-body h-100">
                                <h5 className="card-title">Research Title 1</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card my-2">
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={Placeholder} className="img-thumbnail rounded-start" alt="..."/>
                        </div>
                        <div className="col-md-9">
                            <div className="card-body h-100">
                                <h5 className="card-title">Research Title 2</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}