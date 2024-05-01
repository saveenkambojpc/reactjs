import { Box, Card, Grid, Typography } from "@mui/material";
import dummmyImage from "/assets/images/avatars/dummy.png"
import BPTrendChart from "./chart/bp-trend";
import { Link } from "react-router-dom";
import { UserModel } from "../../../types/api/UserModel";

export default function FamilyProfileCard({ data }: { data: UserModel }) {
    return (
        <Link
            to={data.id}
            state={data}
        >
            <Card sx={{ px: 3, py: 1, border: 1, borderColor: 'divider' }} >
                <Typography textAlign="center">
                    {data.name}
                </Typography>

                <Grid container>
                    <Grid item xs={4}>
                        <Grid container justifyContent="center">
                            <img height={120} src={data.image_uri ?? dummmyImage} alt="profile_pic" />

                            <Box>
                                <Typography>Weight: {data.weight}</Typography>
                            </Box>

                            {/* <Box mt={1}>
                                <Warning sx={{ fontSize: 42 }} color="warning" />
                            </Box> */}
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <BPTrendChart />
                        <BPTrendChart />
                    </Grid>

                </Grid>
            </Card>
        </Link>
    )
}