const Link = require('../models/Link');

class LinkController {

    async createLink(req, res) {

        const { title, url, categories, type, medium } = req.body;

        const link = new Link({ title, url, categories, type, medium });

        link.postedBy = req.user._id;

        link.save((err, link) => {
            if(err) {
                console.log(err);
                return res.status(400).json({
                    message: 'Can\'t create link!',
                });
            }
            return res.status(201).json({
                message: `${title} link created succesfully!`,
                link
            })
        });
    }

    async getLinks(req, res) {
        const query = req.query.slug;
        if (query === 'all') {
            try {
                const links = await Link.find();
                return res.status(200).json({
                    message: 'Successfully Fetched All Links!',
                    links
                })
            }
            catch (err) {
                return res.status(500).json({
                    message: 'Can\'t Load Links'
                })
            }
        }
        else{
            try {
                const link = await Link.find({ query });
                return res.status(200).json({
                    message: `Successfully Fetched ${query} Links!`,
                    link
                })
            }
            catch (err) {
                return res.status(500).json({
                    message: 'Can\'t Load Links'
                })
            }
        }
    }

    async updateLink(req, res) {

    }

    async deleteLink(req, res) {
        const id = req.params.id;
        console.log(id);
        try {
            await Link.findByIdAndDelete(id, { new: true });
            return res.status(200).json({
                message: 'Link deleted Successfully'
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({
                message: 'Can\'t Delete the Link!'
            })
        }
    }
    
}

module.exports = new LinkController();